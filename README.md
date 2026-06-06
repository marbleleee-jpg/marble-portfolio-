# 이채원 포트폴리오

Brand & AI Creative Marketer 포트폴리오 사이트입니다.

## 📁 파일 구성

```
index.html      메인 페이지 (한국어)
index-en.html   영어 페이지 (English)
styles.css      스타일 (두 페이지 공용)
app.js          한국어 페이지 스크립트
app-en.js       영어 페이지 스크립트
이미지 13장      (아래 목록 참고 — 같은 폴더에 둡니다)
```

> 🌐 **한국어 ↔ 영어 전환**: 두 페이지 우측 상단의 `EN` / `KO` 버튼으로 오갑니다.
> 배포 시 `index-en.html` 과 `app-en.js` 도 함께 올려주세요.

모든 경로는 **상대 경로**라, 이 파일들을 같은 폴더(저장소 루트)에 그대로 올리면 작동합니다.
폰트는 인터넷 CDN에서 자동으로 불러옵니다.

> 💡 **이미지를 하나씩 올려도 괜찮습니다.**
> 아직 올리지 않은 이미지는 자동으로 "이미지 준비 중" 자리표시로 보이고, 레이아웃은 그대로 유지됩니다.
> 깨진 이미지 아이콘이 뜨지 않으니, 사진을 천천히 하나씩 교체해도 됩니다.

---

## 🖼 이미지 파일 목록 (파일명을 정확히 맞춰주세요)

| 파일명 | 위치 | 권장 비율 |
|---|---|---|
| `profile-portrait.jpg` | 히어로 — 프로필 사진 | 세로 4:5 |
| `pado-main.jpg` | 파도 케이스 — 메인 배너 | 가로 와이드 (약 21:8) |
| `pado-onesize.jpg` | 파도 — 원사이즈 수영복 | 가로 4:3 |
| `pado-life.jpg` | 파도 — 브랜드 화보 | 가로 4:3 |
| `pado-popup.jpg` | 파도 — 신촌 팝업스토어 | 세로 4:5 |
| `thumb-korean.jpg` | 엄지툰 — 국어 4→1 | 세로 4:5 |
| `thumb-seoul.jpg` | 엄지툰 — 서울대 | 세로 4:5 |
| `thumb-gym.jpg` | 엄지툰 — 헬스장 | 세로 4:5 |
| `thumb-temple.jpg` | 엄지툰 — 템플 스테이 | 세로 4:5 |
| `thumb-club.jpg` | 엄지툰 — 클럽 | 세로 4:5 |
| `vid-musinsa.jpg` | AI Video — 무신사 캠페인 썸네일 | 가로 16:10 |
| `vid-abib.jpg` | AI Video — 아비브 광고 썸네일 | 가로 16:10 |
| `vid-padofilm.jpg` | AI Video — 파도 브랜드 필름 썸네일 | 가로 16:10 |

파일명만 위와 똑같이 맞추면, 어떤 사진으로 바꿔도 자동으로 들어갑니다.

---

## 🚀 GitHub Pages로 배포하기

### 1. 저장소 만들기
1. GitHub에서 **New repository** 클릭
2. 이름은 자유롭게 (예: `portfolio`) → **Create repository**

### 2. 파일 올리기
- 저장소 페이지에서 **Add file → Upload files** 클릭
- **`index.html`, `styles.css`, `app.js`** 를 먼저 올리고 **Commit changes**
- 이미지는 같은 방식으로 **하나씩 또는 한꺼번에** 올리면 됩니다 (파일명만 위 목록과 동일하게)

### 3. Pages 켜기
1. 저장소 상단 **Settings** → 왼쪽 메뉴 **Pages**
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` / 폴더는 `/ (root)` → **Save**
4. 1~2분 뒤 새로고침하면 상단에 주소가 뜹니다:
   `https://<내아이디>.github.io/portfolio/`

이 주소에서는 LinkedIn·Instagram·YouTube 링크가 **새 탭에서 정상적으로 열립니다.**

---

## 🔗 연결된 링크
- 이메일: marble.leee@gmail.com
- LinkedIn: https://www.linkedin.com/in/chewon-lee-6606b4269/
- Instagram: https://www.instagram.com/thumbb_kim/
- YouTube: https://www.youtube.com/@파도프로젝트

링크를 바꾸려면 `index.html`에서 위 주소를 찾아 수정하면 됩니다.
