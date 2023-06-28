import { Link } from "react-router-dom";
import { Logo } from "../../components/wrapper/StWrapper";
import { InfoWrap, Bottom, Center, Top, LeftFooter, RightFooter } from "./StInfo";

function Info() {
    return (
        <InfoWrap>
            <Top>
                <Logo>PORT</Logo>
                <Link to='/main'>시작하러 가기</Link>
            </Top>
            <Center>
                <div>대화방 소개</div>
                <div>휴가신청 소개</div>
                <div>경조사 소개</div>
                <div>나만의 할일, 캘린더 소개</div>
            </Center>
            <Bottom>
                <LeftFooter>
                    <Logo>PORT</Logo>
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
