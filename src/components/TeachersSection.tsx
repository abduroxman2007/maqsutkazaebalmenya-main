import React from 'react';
import { useTranslation } from '../TranslationContext';
import { animateOnScroll } from '../animations';
import '../styles/teachers.css';
// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const TeachersSection: React.FC = () => {
  const { t } = useTranslation();
  // Teacher data for Swiper (4 and onward)
  const swiperTeachers = [
    {
      id: 'teacher5',
      img: '/assets/img/JasurbekUmarov.jpg',
    },
    {
      id: 'teacher6',
      img: '/assets/img/OzodbekEshboboev.jpg',
    },
    {
      id: 'teacher7',
      img: '/assets/img/KhusanRakhimov.jpg',
    },
    {
      id: 'teacher8',
      img: '/assets/img/JamshidbekIzzatulloh.jpg',
    },
  ];

  const teacherData = [
    {
      id: 'teacher1',
      logo: null,
      logoClass: '',
      img: '/assets/img/Olimjon.png',
    },
    {
      id: 'teacher2',
      logo: '/assets/img/KAIST.png',
      logoClass: 'right',
      img: '/assets/img/Azizbek.png',
    },
    {
      id: 'teacher3',
      logo: '/assets/img/CMUQ.png',
      logoClass: '',
      img: '/assets/img/Aruzhan.png',
    },
    {
      id: 'teacher4',
      logo: '/assets/img/CMUQ.png',
      logoClass: 'right',
      img: '/assets/img/Eldor.PNG',
    },
  ];

  React.useEffect(() => { animateOnScroll(); }, []);
  return (
    <section id="teachers" className="teachers">
      <div className="teachers-container">
        <div data-animate="center">
          <h2>{t('teachers-title')}</h2>
        </div>
        <div className="teacher-list">
          {teacherData.slice(0, 3).map((teacher, idx) => (
            <div
              className={`teacher-item${idx % 2 === 1 ? ' reverse' : ''}`}
              data-animate="card"
              data-animate-delay={100 * (idx + 1)}
              key={teacher.id}
            >
              {teacher.logo && (
                <img className={`teacher-logo-corner${teacher.logoClass ? ' ' + teacher.logoClass : ''}`} src={teacher.logo} alt={t(`${teacher.id}-logo-alt`)} />
              )}
              <div className="teacher-image">
                <img src={teacher.img} alt={t(`${teacher.id}-image-alt`)} style={{ objectFit: 'cover', borderRadius: 16 }} />
              </div>
              <div className="teacher-info">
                <h3 style={{ textAlign: 'center' }}>{t(`${teacher.id}-name`)}</h3>
                <p className="teacher-title" style={{ textAlign: 'center' }}>{t(`${teacher.id}-title`)}</p>
                <p className="teacher-description" style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: t(`${teacher.id}-description`) }} />
                <div className="teacher-features-row">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`teacher-feature-card${i === 0 ? ' blue' : ' grey'}`}
                    >
                      <div className={`teacher-feature-circle${i === 0 ? ' white' : ' orange'}`}></div>
                      <div className="teacher-feature-main">{t(`${teacher.id}-achievement${i + 1}-main`)}</div>
                      <div className="teacher-feature-desc">{t(`${teacher.id}-achievement${i + 1}-sub`)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div data-animate="center">
            <h2>{t('teachers-title')}</h2>
          </div>
          {/* Eldor - 4th teacher */}
          <div className="teacher-item reverse" data-animate="card" data-animate-delay="400">
            <img className="teacher-logo-corner right" src="/assets/img/CMUQ.png" alt={t('teacher4-logo-alt')} />
            <div className="teacher-image">
              <img src="/assets/img/Eldor.PNG" alt={t('teacher4-image-alt')} style={{ objectFit: 'cover', borderRadius: 16 }} />
            </div>
            <div className="teacher-info">
              <h3 style={{ textAlign: 'center' }}>{t('teacher4-name')}</h3>
              <p className="teacher-title" style={{ textAlign: 'center' }}>{t('teacher4-title')}</p>
              <p className="teacher-description" style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: t('teacher4-description') }} />
              <div className="teacher-features-row">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`teacher-feature-card${i === 0 ? ' blue' : ' grey'}`}
                  >
                    <div className={`teacher-feature-circle${i === 0 ? ' white' : ' orange'}`}></div>
                    <div className="teacher-feature-main">{t(`teacher4-achievement${i + 1}-main`)}</div>
                    <div className="teacher-feature-desc">{t(`teacher4-achievement${i + 1}-sub`)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div data-animate="center">
            <h2>{t('teachers-title2')}</h2>
          </div>
          {/* Swiper for teachers 4+ */}
          <div className="teacherimg-swiper-section">
            <Swiper
              className="teacherimg-swiper"
              modules={[Autoplay, Pagination]}
              spaceBetween={32}
              slidesPerView={3}
              breakpoints={{
                0: { slidesPerView: 1 },
                700: { slidesPerView: 2 },
                1100: { slidesPerView: 3 }
              }}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
            >
              {swiperTeachers.map((teacher, idx) => (
                <SwiperSlide key={teacher.id + idx}>
                  <div className="teacherimg-swiper-slide">
                    <img className="teacherimg-swiper-img" src={teacher.img} alt={t(`${teacher.id}-image-alt`)} />
                    <div className="teacherimg-swiper-overlay">
                      <div className="teacherimg-swiper-overlay-name">{t(`${teacher.id}-name`)}</div>
                      <div className="teacherimg-swiper-overlay-title">{t(`${teacher.id}-title`)}</div>
                      <div className="teacherimg-swiper-overlay-features">
                        {[1, 2, 3].map((i) => (
                          <div className="teacherimg-swiper-overlay-feature" key={i}>{t(`${teacher.id}-achievement${i}`)}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeachersSection; 