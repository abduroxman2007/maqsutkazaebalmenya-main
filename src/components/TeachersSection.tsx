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
      img: '/assets/img/JasurbekUmarov.jpg',
      name: t('teacher4-name'),
      title: t('teacher4-title'),
      desc: t('teacher4-description'),
      achievements: [
        t('teacher4-achievement1'),
        t('teacher4-achievement2'),
        t('teacher4-achievement3'),
      ],
    },
    {
      img: '/assets/img/OzodbekEshboboev.jpg',
      name: t('teacher5-name'),
      title: t('teacher5-title'),
      desc: t('teacher5-description'),
      achievements: [
        t('teacher5-achievement1'),
        t('teacher5-achievement2'),
        t('teacher5-achievement3'),
      ],
    },
    {
      img: '/assets/img/KhusanRakhimov.jpg',
      name: t('teacher6-name'),
      title: t('teacher6-title'),
      desc: t('teacher6-description'),
      achievements: [
        t('teacher6-achievement1'),
        t('teacher6-achievement2'),
        t('teacher6-achievement3'),
      ],
    },
    {
      img: '/assets/img/JamshidbekIzzatulloh.jpg',
      name: t('teacher7-name'),
      title: t('teacher7-title'),
      desc: t('teacher7-description'),
      achievements: [
        t('teacher7-achievement1'),
        t('teacher7-achievement2'),
        t('teacher7-achievement3'),
      ],
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
          {[
            {
              img: "/assets/img/Olimjon.png",
              name: t('teacher1-name'),
              title: t('teacher1-title'),
              desc: t('teacher1-description'),
              achievements: [
                t('teacher1-achievement1'),
                t('teacher1-achievement2'),
                t('teacher1-achievement3'),
              ],
              logo: null,
              logoClass: "",
              imageAlt: "Olimjon Uvayzov",
            },
            {
              img: "/assets/img/Azizbek.png",
              name: t('teacher2-name'),
              title: t('teacher2-title'),
              desc: t('teacher2-description'),
              achievements: [
                t('teacher2-achievement1'),
                t('teacher2-achievement2'),
                t('teacher2-achievement3'),
              ],
              logo: "/assets/img/KAIST.png",
              logoClass: "right",
              imageAlt: "Azizbek Alijonov",
            },
            {
              img: "/assets/img/Aruzhan.png",
              name: t('teacher3-name'),
              title: t('teacher3-title'),
              desc: t('teacher3-description'),
              achievements: [
                t('teacher3-achievement1'),
                t('teacher3-achievement2'),
                t('teacher3-achievement3'),
              ],
              logo: "/assets/img/CMUQ.png",
              logoClass: "",
              imageAlt: "Aruzhan",
            },
          ].map((teacher, idx) => (
            <div
              className={`teacher-item${idx % 2 === 1 ? ' reverse' : ''}`}
              data-animate="card"
              data-animate-delay={100 * (idx + 1)}
              key={teacher.name}
            >
              {teacher.logo && (
                <img className={`teacher-logo-corner${teacher.logoClass ? ' ' + teacher.logoClass : ''}`} src={teacher.logo} alt="University Logo" />
              )}
              <div className="teacher-image">
                <img src={teacher.img} alt={teacher.imageAlt} style={{ objectFit: 'cover', borderRadius: 16 }} />
              </div>
              <div className="teacher-info">
                <h3 style={{ textAlign: 'center' }}>{teacher.name}</h3>
                <p className="teacher-title" style={{ textAlign: 'center' }}>{teacher.title}</p>
                <p className="teacher-description" style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: teacher.desc }} />
                <div className="teacher-achievements" style={{ textAlign: 'left' }}>
                  {teacher.achievements.map((ach, i) => (
                    <span className="achievement" key={i}>{ach}</span>
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
            <img className="teacher-logo-corner right" src="/assets/img/CMUQ.png" alt="University Logo" />
            <div className="teacher-image">
              <img src="/assets/img/Eldor.PNG" alt="Eldor" style={{ objectFit: 'cover', borderRadius: 16 }} />
            </div>
            <div className="teacher-info">
              <h3 style={{ textAlign: 'center' }}>{t('teacher4-name')}</h3>
              <p className="teacher-title" style={{ textAlign: 'center' }}>{t('teacher4-title')}</p>
              <p className="teacher-description" style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: t('teacher4-description') }} />
              <div className="teacher-achievements" style={{ textAlign: 'left' }}>
                <span className="achievement">{t('teacher4-achievement1')}</span>
                <span className="achievement">{t('teacher4-achievement2')}</span>
                <span className="achievement">{t('teacher4-achievement3')}</span>
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
                <SwiperSlide key={teacher.name + idx}>
                  <div className="teacherimg-swiper-slide">
                    <img className="teacherimg-swiper-img" src={teacher.img} alt={teacher.name} />
                    <div className="teacherimg-swiper-overlay">
                      <div className="teacherimg-swiper-overlay-name">{teacher.name}</div>
                      <div className="teacherimg-swiper-overlay-title">{teacher.title}</div>
                      <div className="teacherimg-swiper-overlay-features">
                        {teacher.achievements.map((ach, i) => (
                          <div className="teacherimg-swiper-overlay-feature" key={i}>{ach}</div>
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