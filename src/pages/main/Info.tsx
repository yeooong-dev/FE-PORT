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
  Info5,
} from "./StInfo";
import chatImg from "../../image/chat.png";
import famImg from "../../image/fam.png";
import famImg2 from "../../image/fam2.png";
import todoImg from "../../image/todo.png";
import calImg from "../../image/cal.png";
import chartImg from "../../image/chart.png";
import vacImg from "../../image/vac.png";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

function Info() {
  const [isLogin] = UseIsLogin();
  const [ref2, inView2] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const [ref3, inView3] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref4, inView4] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref5, inView5] = useInView({ threshold: 0.3, triggerOnce: true });

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
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView2 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className='imgBox'
            >
              <img src={famImg} alt='경조사' />
              <img src={famImg2} alt='경조사' className='famImg2' />
            </motion.div>

            <div className='textBox'>
              <p>
                자주 까먹는 각종 경조사를 <br />
                까먹지 말고
              </p>
              <h3>한 눈에 보기쉽게 정리!</h3>
            </div>
          </Info2>

          <Info3 ref={ref3}>
            <div className='textBox'>
              <p>자유롭게 소통할 수 있는</p>
              <h3>채팅방!</h3>
            </div>

            <motion.img
              src={chatImg}
              alt='채팅'
              initial={{ opacity: 0, x: 50 }}
              animate={inView3 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            />
          </Info3>

          <Info4 ref={ref4}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView4 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
              className='imgBox'
            >
              <img src={todoImg} alt='할일' />
              <img src={calImg} alt='캘린더' className='cal' />
            </motion.div>

            <div className='textBox'>
              <h3>나만 볼수 있는</h3>
              <p>오늘의 할일과 캘린더!</p>
            </div>
          </Info4>

          <Info5 ref={ref5}>
            <div className='left'>
              <p>보기 쉽게 정리된 조직도!</p>
              <motion.img
                src={chartImg}
                alt='조직도'
                className='chart'
                initial={{ opacity: 0, y: 50 }}
                animate={inView5 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
              />
            </div>

            <div className='right'>
              <p>선착순 연차 신청 가능!</p>
              <motion.img
                src={vacImg}
                alt='연차'
                className='cal'
                initial={{ opacity: 0, y: 50 }}
                animate={inView5 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
              />
            </div>
          </Info5>
        </Center>
        <Bottom>
          <LeftFooter>
            <h1>PORT</h1>
            <p>제작자 : 이인영</p>
            <p>핸드폰 번호 : 010-5300-8219</p>
            <p>이메일 : yeooong12@naver.com</p>
          </LeftFooter>
          <RightFooter>
            <p>©️ 2024.InYeong. All rights reserved</p>
          </RightFooter>
        </Bottom>
      </InfoWrap>
    </Wrap>
  );
}

export default Info;
