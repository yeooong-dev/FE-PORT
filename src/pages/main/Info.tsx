import { Link } from "react-router-dom";
import UseIsLogin from "../../hook/UseIsLogin";
import { InfoWrap, Bottom, Center, LeftFooter, RightFooter, Left, Info1, Info2, Wrap, Info3, Info4 } from "./StInfo";
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
    const [ref1, inView1] = useInView({ threshold: 0.3, triggerOnce: true });
    const [ref2, inView2] = useInView({ threshold: 0.3, triggerOnce: true });
    const [ref3, inView3] = useInView({ threshold: 0.3, triggerOnce: true });
    const [ref4, inView4] = useInView({ threshold: 0.3, triggerOnce: true });

    const startLink = isLogin ? "/main" : "/login";

    return (
        <Wrap>
            <InfoWrap>
                <Center>
                    <Info1>
                        <Left>
                            <div className='circle1'></div>
                            <div className='circle2'></div>
                            <motion.div
                                ref={ref1}
                                initial={{ opacity: 0, y: 50 }}
                                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8 }}
                            >
                                <h1>PORT</h1>
                                <span>
                                    누구든지 쉽게 사용이 가능한, <br />
                                    유용하게 사용하는 업무용 협업툴!
                                </span>
                                <Link to={startLink}>
                                    <p>시작하러 가기 &nbsp; {">"}</p>
                                </Link>
                            </motion.div>
                        </Left>
                    </Info1>

                    <Info2 ref={ref2}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView2 ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className='wrap'
                        >
                            <div className='textBox'>
                                <p>
                                    자주 까먹는 각종 경조사를 <br />
                                    까먹지 말고
                                </p>
                                <h3>한 눈에 보기쉽게 정리!</h3>
                            </div>

                            <div className='imgBox'>
                                <img src={famImg} alt='경조사' />
                                <img src={famImg2} alt='경조사' className='famImg2' />
                            </div>
                        </motion.div>
                    </Info2>

                    <Info3 ref={ref3}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView3 ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className='wrap'
                        >
                            <div className='textBox'>
                                <h3>나만 볼수 있는</h3>
                                <p>오늘의 할일과 캘린더!</p>
                            </div>

                            <div className='imgBox'>
                                <img src={todoImg} alt='할일' />
                                <img src={calImg} alt='캘린더' className='famImg2' />
                            </div>
                        </motion.div>
                    </Info3>

                    <Info4 ref={ref4}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView4 ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className='wrap'
                        >
                            <div className='textBox'>
                                <p>보기 쉽게 정리된 조직도와</p>
                                <p>선착순 연차 신청 기능</p>
                            </div>

                            <div className='imgBox'>
                                <img src={chartImg} alt='조직도' />
                                <img src={vacImg} alt='연차신청' className='famImg2' />
                            </div>
                        </motion.div>

                        {/* <div className='left'>
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
                            <p></p>
                            <motion.img
                                src={vacImg}
                                alt='연차'
                                className='cal'
                                initial={{ opacity: 0, y: 50 }}
                                animate={inView5 ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 1 }}
                            />
                        </div> */}
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
                        <p>©️ 2024.InYeong. All rights reserved</p>
                    </RightFooter>
                </Bottom>
            </InfoWrap>
        </Wrap>
    );
}

export default Info;
