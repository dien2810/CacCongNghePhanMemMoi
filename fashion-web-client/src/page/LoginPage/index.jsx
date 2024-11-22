import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper
import '../../../node_modules/swiper/swiper-bundle.min.css';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function LoginPage(props) {
    const [isSignup, setIsSignUp] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef(null);
    const slides = [
        require('../../assets/img/hero-image.png'),
        require('../../assets/img/img1.jpg'),
        require('../../assets/img/img2.jpg'),
        require('../../assets/img/img3.jpg'),
        require('../../assets/img/img4.jpg'),
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            // Tăng chỉ số hiện tại
            setCurrentIndex((prevIndex) => {
                if (prevIndex === slides.length - 1) {
                    // Nếu đang ở slide cuối cùng, quay lại slide đầu tiên
                    return 0;
                } else {
                    // Chuyển đến slide tiếp theo
                    return prevIndex + 1;
                }
            });
        }, 3000); // Chuyển đổi mỗi 3 giây

        return () => clearInterval(interval); // Dọn dẹp khi component unmount
    }, [slides.length]);

    useEffect(() => {
        if (swiperRef.current) {
            // Chuyển đến slide hiện tại
            swiperRef.current.swiper.slideTo(currentIndex);
        }
    }, [currentIndex]);

    return (
        <div style={{ marginTop: '25px' }}>
            <section>
                <div className='container-1139'>
                <h1 className='logo' style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px' }}>NHÓM 06</h1>
                </div>
            </section>
            <div className='loginform'>
                <div className='container-1139 loginform-container'>
                    <Swiper
                        ref={swiperRef}
                        spaceBetween={30} // Khoảng cách giữa các slide
                        loop={false} // Tắt chế độ lặp lại của Swiper
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <img src={slide} alt='login' />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {isSignup
                        ? <SignUpForm setIsSignUp={setIsSignUp} setUser={props.setUser} />
                        : <LoginForm setIsSignUp={setIsSignUp} />
                    }
                </div>
            </div>
        </div>
    );
}

export default LoginPage;