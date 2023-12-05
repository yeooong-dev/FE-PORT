import { Link } from "react-router-dom";
import UseIsLogin from "../../hook/UseIsLogin";
import {
  InfoWrap,
  Bottom,
  Center,
  LeftFooter,
  RightFooter,
  Left,
  Right,
  Info1,
  Info2,
  Info3,
  Info4,
} from "./StInfo";

function Info() {
  const [isLogin] = UseIsLogin();

  const startLink = isLogin ? "/main" : "/login";

  return (
    <InfoWrap>
      <Center>
        <Info1>
          <Left>
            <div className='circle1'></div>
            <div className='circle2'></div>
            <div className='circle3'></div>
            <div className='circle4'></div>
            <h1>PORT</h1>
            <span>
              누구든지 쉽게 사용이 가능한, <br />
              유용하게 사용하는 업무용 협업툴!
            </span>
            <Link to={startLink}>
              <p>시작하러 가기 &nbsp; {">"}</p>
            </Link>
          </Left>
          <Right>
            <div>
              협업의 기본! <br />
              채팅 기능 OK
            </div>
            <div>
              한 눈에 보기 쉽게 <br />
              관리 OK
            </div>
            <div>
              협업 뿐만 아니라, <br />
              나만의 할 일 체크도 OK
            </div>
          </Right>
        </Info1>

        <Info2>
          <div>캡쳐</div>
          <p>
            참여 인원 자유롭게 선택 가능 & 업무 환경에 따라 대화방을 자유롭게
            개설해 소통 가능
          </p>
        </Info2>
        <Info3>
          <div>캡쳐</div>
          <p>눈치 볼 필요 없이, 이제는 선착순으로 연차 신청하자!</p>
        </Info3>
        <Info4>
          <div>캡쳐</div>
          <p>매일 까먹는 각종 경조사! 한 눈에 정리하자!</p>
        </Info4>
      </Center>
      <Bottom>
        <LeftFooter>
          <h1>PORT</h1>
          <p>제작자 : 이인영</p>
          <p>핸드폰 번호 : 010-5300-8219</p>
          <p>이메일 : yeooong12@naver.com</p>
        </LeftFooter>
        <RightFooter>
          <p>©️ 2023.InYeong. All rights reserved</p>
        </RightFooter>
      </Bottom>
    </InfoWrap>
  );
}

export default Info;
