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
  Wrap,
} from "./StInfo";
import chatImg from "../../image/chat.png";
import famImg from "../../image/fam.png";
import famImg2 from "../../image/fam2.png";
import todoImg from "../../image/todo.png";
import calImg from "../../image/cal.png";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

function Info() {
  const [isLogin] = UseIsLogin();
  const [ref2, inView2] = useInView({ threshold: 0.8, triggerOnce: true });
  const [ref3, inView3] = useInView({ threshold: 0.5, triggerOnce: true });
  const [ref4, inView4] = useInView({ threshold: 0.5, triggerOnce: true });

  const startLink = isLogin ? "/main" : "/login";

  return (
    <Wrap>
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

          <Info2 ref={ref2}>
            <motion.img
              src={chatImg}
              alt='채팅'
              initial={{ opacity: 0, x: -100 }}
              animate={inView2 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            />
            <p>
              가입자들과 소통할 수 있는
              <br />
              채팅방!
            </p>
          </Info2>
          <Info3 ref={ref3}>
            <p>
              자주 까먹는 각종 경조사! <br />
              까먹지 말고 한 눈에 정리하자!
            </p>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={inView3 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <img src={famImg} alt='경조사' />
              <img src={famImg2} alt='경조사' className='famImg2' />
            </motion.div>
          </Info3>
          <Info4 ref={ref4}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={inView4 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <img src={todoImg} alt='할일' />
              <img src={calImg} alt='캘린더' className='cal' />
            </motion.div>
            <p>
              오늘의 할일과
              <br />
              일정도 정리 가능!
            </p>
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
    </Wrap>
  );
}

export default Info;
