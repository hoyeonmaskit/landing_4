import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import nodemailer from 'nodemailer';

// 서비스 계정 인증 설정 - 환경 변수로부터 가져오기
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "landing@applied-pursuit-456802-c7.iam.gserviceaccount.com", // 스프레드시트에 접근 권한이 있는 계정
  key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

const SPREADSHEET_ID = process.env.BETA_SIGNUP_SPREADSHEET_ID || '1wzmT0aTmQQNbkXmvfwOPh7oWdEunrKoqHh687uiGDtI';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 스프레드시트 초기화
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    console.log(`Spreadsheet loaded: ${doc.title}`);
    
    // 첫 번째 시트 사용 (또는 원하는 시트 이름으로 변경)
    const sheet = doc.sheetsByIndex[0];
    
    // 필요한 헤더 정의
    const headers = [
      'timestamp', 'type', 'performanceName', 'genre', 'expectedDate', 
      'expectedAudience', 'email', 'concept', 'services', 'progressLevel', 'completedStages',
      'applicantType', 'companyName', 'phone'
    ];
    
    // 헤더 로우 확인 및 설정
    try {
      const headerValues = await sheet.headerValues;
      if (!headerValues || headerValues.length === 0) {
        // 헤더가 없는 경우 헤더 설정
        await sheet.setHeaderRow(headers);
      }
    } catch {
      // 시트가 비어 있거나 헤더가 없는 경우
      await sheet.setHeaderRow(headers);
    }
    
    // 스프레드시트에 행 추가
    await sheet.addRow({
      timestamp: new Date().toISOString(),
      type: body.type || '',
      performanceName: body.performanceName || '',
      genre: body.genre || '',
      expectedDate: body.expectedDate || '',
      expectedAudience: body.expectedAudience || '',
      email: body.email || '',
      concept: body.concept || '',
      services: Array.isArray(body.services) ? body.services.join(', ') : body.services || '',
      progressLevel: body.progressLevel || '',
      completedStages: Array.isArray(body.completedStages) ? body.completedStages.join(', ') : body.completedStages || '',
      applicantType: body.applicantType || '',
      companyName: body.companyName || '',
      phone: body.phone || '',
    });

    // 이메일 전송 설정
    // Gmail SMTP 설정
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // 관리자에게 알림 이메일 전송
    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `[마스킷] 새로운 ${body.type} 신청이 있습니다: ${body.performanceName}`,
      html: `
        <h2>새로운 ${body.type} 신청이 접수되었습니다</h2>
        <h3>신청자 정보</h3>
        <p><strong>신청자 유형:</strong> ${body.applicantType || '-'}</p>
        <p><strong>회사/단체명:</strong> ${body.companyName || '-'}</p>
        <p><strong>이메일:</strong> ${body.email}</p>
        <p><strong>전화번호:</strong> ${body.phone || '-'}</p>
        
        <h3>공연 정보</h3>
        <p><strong>공연명:</strong> ${body.performanceName}</p>
        <p><strong>장르:</strong> ${body.genre}</p>
        <p><strong>예상 공연 시기:</strong> ${body.expectedDate}</p>
        <p><strong>예상 관객 수:</strong> ${body.expectedAudience}</p>
        <p><strong>현재 진행 수준:</strong> ${body.progressLevel || '-'}</p>
        <p><strong>완료된 제작 단계:</strong> ${Array.isArray(body.completedStages) ? body.completedStages.join(', ') : body.completedStages || '-'}</p>
        <p><strong>공연 기획 의도:</strong> ${body.concept || '-'}</p>
        <p><strong>관심 서비스:</strong> ${Array.isArray(body.services) ? body.services.join(', ') : body.services || '-'}</p>
        <p><a href="https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}" target="_blank">스프레드시트에서 모든 신청 확인하기</a></p>
      `
    };

    // 신청자에게 확인 메일 전송
    const applicantMailOptions = {
      from: process.env.GMAIL_USER,
      to: body.email,
      subject: `[마스킷] ${body.type} 신청이 접수되었습니다`,
      html: `
        <h2>안녕하세요, 마스킷입니다.</h2>
        <p>귀하의 ${body.type} 신청이 성공적으로 접수되었습니다.</p>
        
        <h3>신청 정보</h3>
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <tr style="background-color: #f8f8f8;">
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>신청자 유형</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${body.applicantType || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>회사/단체명</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${body.companyName || '-'}</td>
          </tr>
          <tr style="background-color: #f8f8f8;">
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>공연명</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${body.performanceName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>장르</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${body.genre}</td>
          </tr>
          <tr style="background-color: #f8f8f8;">
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>예상 공연 시기</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${body.expectedDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>예상 관객 수</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${body.expectedAudience}</td>
          </tr>
          <tr style="background-color: #f8f8f8;">
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>현재 진행 수준</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${body.progressLevel || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>완료된 제작 단계</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${Array.isArray(body.completedStages) ? body.completedStages.join(', ') : body.completedStages || '-'}</td>
          </tr>
          <tr style="background-color: #f8f8f8;">
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>관심 서비스</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${Array.isArray(body.services) ? body.services.join(', ') : body.services || '-'}</td>
          </tr>
        </table>
        
        <p>신청하신 내용은 빠른 시일 내에 검토 후, 추가 안내사항을 메일로 전달드리도록 하겠습니다.</p>
        <p>추가 문의사항이 있으시면 회신 부탁드립니다.</p>
        <p>감사합니다.<br>마스킷 팀 드림</p>
      `
    };

    try {
      // 관리자에게 이메일 전송
      await transporter.sendMail(adminMailOptions);
      
      // 신청자에게 이메일 전송
      await transporter.sendMail(applicantMailOptions);
      
      console.log('이메일이 성공적으로 전송되었습니다');
    } catch (emailError) {
      console.error('이메일 전송 중 오류 발생 :', emailError);
      // 이메일 전송 실패해도 API 응답은 성공으로 처리
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error processing form submission:', err);
    return NextResponse.json(
      { error: 'Failed to process form submission' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
