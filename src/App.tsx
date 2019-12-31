import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Menu from "./components/Menu";
import CurrentName from "./components/CurrentName";
import About from "./pages/About";
import Membership from "./pages/Membership";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Exhibitions from "./pages/Exhibitions";
import Schedule from "./pages/Schedule";
import uuid from "uuid";
import moment from "moment";
import "moment/locale/ja";

moment.locale("ja");

export type Labels =
  | "スケジュール"
  | "展覧会"
  | "メンバーシップ"
  | "ワタリウム美術館について"
  | "トップ";
export type Urls = "schedule" | "exhibitions" | "membership" | "about" | "";

export interface TransitionProp {
  transitionStatus: TransitionStatus;
  duration: number;
}

interface LinkItem {
  label: Labels;
  url: Urls;
}

interface PageItem {
  url: Urls;
  component: React.FC<any>;
}

interface Exhibition {
  id: string;
  title: string;
  subtitle?: string;
  sumbnail: string;
  start: Date;
  finish: Date;
  overview: string;
}

export const exhibitions: Exhibition[] = [
  {
    id: uuid(),
    title: "フィリップパレーノ展",
    subtitle: "オブジェが語り始めること",
    sumbnail: `${process.env.PUBLIC_URL}/img/sample.jpg`,
    start: new Date("2019/11/2"),
    finish: new Date("2020/3/22"),
    overview:
      "同時代の重要なアーティストの一人、フィリップ・パレーノの日本初となる大掛かりな展覧会です。パレーノの特徴は、映像、彫刻、ドローイング、テキストなど多様な手法を用い、展覧会を一貫したひとつのメディアとして捉えていることです。つまり展覧会は一連の出来事が展開する空間であり、個々の作品の意味ではなく、「オブジェクト」として展覧会の可能性を探っていくと、展覧会はオープンスペースとなり、時に応じて変化するフォーマットとなります。展覧会に訪れることが、空間的・時間的境界や感覚的経験を伴う唯一無二の体験となることを目指しているのです。本展では、パレーノの代表作である白熱光が点滅する「マーキー」や、天井に張りつく風船「吹き出し」のほか、1995年にワタリウム美術館と伝説のキュレター、ヤン・フートがコラボレートした展覧会「水の波紋展」で制作した氷の「雪だるま」がその姿を新しくし登場します。無色透明なこれらの作品を通し、パレーノが見ている近未来の風景が広がるのでしょうか。最先端でありながら懐かしい、現れては消える不思議なパレーノワールドです。A key artist of his generation, Philippe Parreno has radically redefined the exhibition experience by taking it as a medium, placing its construction at the heart of his process. Working in a diverse range of media including film, sculpture, drawing, and text, Parreno conceives his exhibitions as a scripted space where a series of events unfold. He seeks to transform the exhibition visit into a singular experience that plays with spatial and temporal boundaries and the sensory experience of the visitor. For the artist, the exhibition is less a total work of art than a necessary interdependence that offers an ongoing series of open possibilities.In this exhibition, you may encount his masterpieces including Marquee made of lightbulbs and neons flickering, and Speech Bubbles which is balloon work stuck to a ceiling. And also Ice Man exhibited in Ripples across the Water in 1995, a exhibition by WATARI-UM collaborated with a legendary curator Jan Hoet, shall get renewed and reappear. Through these colorless and transparent works, we may witness a neo-futuristic landscape in Parreno’s eyes. This is a cutting-edge but also nostalgic, mysterious world of Parreno, which is here today and gone tomorrow.この展覧会は、1994年から2006年にかけて制作された作品-オブジェのプレゼンテーション、あるいは再構成である。タイトルはこれらの作品がつくられた年代を重ね合わせている。1994年の《しゃべる石》からスタートし、1995年、ワタリウム美術館により企画され、ヤン・フートがキュレーションした「水の波紋」展のために制作された《リアリティー・パークの雪だるま》、そして2007年に発表された最初の《マーキー》まで。これらの年代が過度に露出することで、このモチーフが誕生した。このモチーフにより、タイトルに「語る」という言葉が与えられた。ここに筋書きはない。そして始まりも終わりもない。ここで、オブジェたちは互いに会話しはじめる。それぞれのオブジェ同士には関係がある。カメラを通して、ワタリウム美術館周辺の気圧や風の方向などの細かな出来事にも 反応する。すべては空気の変化や換気に反応している。 オブジェたちは一緒になって、ここの状況をつくっていく。今、2019年11月1日から、一連の語りが完了する2020年3月22日まで。"
  },
  {
    id: uuid(),
    title: "ロイス・ワインバーガー展",
    subtitle: "見えるしぜん・見えない自然展",
    sumbnail: `${process.env.PUBLIC_URL}/img/245_sabotenface_260.jpg`,
    start: new Date("2019/7/13"),
    finish: new Date("2019/10/20"),
    overview:
      "この展覧会はオーストリア出身のアーティスト、ロイス・ワインバーガーの作品を通して「見えない自然」を知り、考え、持ち帰っていただきたいというものです。ワインバーガーのとりあげる「見えない自然」とは一体どんなものでしょうか？それは、私たちが自然と呼んでいる植物や動物、森や海を指すものではなく、文字どおり、形も実態もない目には見えないものです。これからご覧いただく「見えない自然」とは、元来の自然が持つ力そのものを指しています。普遍的で決して消滅することはなく、同時にフラジャイルで変幻自在な、自然のエネルギーそのものを表します。本展ではワインバーガーの40余年の活動から、ドローイング、土や動物を用いた彫刻、植物のオブジェ、映像作品など100点あまりをここに運び、展示しました。これらの作品は、彼のアクティビストとしての頑強な思想に支えられながらも、鳥のような自由さ、生への尊敬や願い、自然のもつ美しさやユーモアを十分に感じさせます。彼のこうした活動は、近年ますます注目を集め、現代美術の動向を示すための国際美術展「ベニス・ビエンナーレ」や「ドクメンタ」、そのほか多くの美術館で展示されています。そして2020年目前の東京でも、「見えない自然」がここから育つことを願っています。"
  },
  {
    id: uuid(),
    title: "ジョン・ルーリー展",
    sumbnail: `${process.env.PUBLIC_URL}/img/buttock_tree_in_full_bloom_360.jpg`,
    start: new Date("2019/4/5"),
    finish: new Date("2019/7/7"),
    overview:
      "80年代初め、オフビートな映像と音楽で注目を集めた「ストレンジャー・ザン・パラダイス」（1984年、監督：ジム・ジャームッシュ）という映画をご存知だろうか。今回、ワタリウム美術館で展示するアーティスト、ジョン・ルーリー（1952年生まれ、U.S.A.）はこの映画の主役を演じた俳優である。NYの安アパートに住みギャンブルで生活を立てている冴えないがちょっとかっこいいウィリーという若者役で登場する。全編モノクロのこの映画はI LOVE NEW YORKキャンペーンで沸くNYの若者たちの日常の素顔を淡々と描いていた。ジョン・ルーリーはミュージシャンとしてこの映画の音楽も担当し、違和感のあるジャズが映像を一層印象深いものにしていた。役者として、さらには自身がフェイク・ジャズバンドと評したラウンジ・リザーズのメンバーとしても注目されることとなった。しかし1990年代後半、ジョン・ルーリーは「ライム病」という難病を患い、映画と音楽の世界から姿を消し、一人で、自由な時間にできる絵画制作に活動の場を移す。かつて、ジャン＝ミシェル・バスキアなどと一緒に描いていたというだけあって、その構図や技法は卓越している。ジョン・ルーリーの描く世界は一見美しい夢の中のように見えるが、一方で痛烈な皮肉が込められ、登場する動物たちも小さく弱々しいが、実はマイペースで自由な喜びをもっている。近年、ジョン・ルーリーは生活の大半をカリブ海の島に暮らし、一層、植物や動物などの自然が多く登場してきている。ワタリウム美術館での展覧会は2010年以来、今回が二度目の開催となる。近頃はアメリカもそして日本もさらに不条理なことが多くなり、そんないま、この展覧会でジョン・ルーリーの描く自由とアナーキーな世界に触れてほしいと願っている。"
  }
];

export const links: LinkItem[] = [
  {
    label: "トップ",
    url: ""
  },
  {
    label: "スケジュール",
    url: "schedule"
  },
  {
    label: "展覧会",
    url: "exhibitions"
  },
  {
    label: "メンバーシップ",
    url: "membership"
  },
  {
    label: "ワタリウム美術館について",
    url: "about"
  }
];

const pages: PageItem[] = [
  {
    url: "about",
    component: About
  },
  {
    url: "membership",
    component: Membership
  },
  {
    url: "",
    component: Home
  },
  {
    url: "exhibitions",
    component: Exhibitions
  },
  {
    url: "schedule",
    component: Schedule
  }
];

export const TRANSITION_DURATION = 300;

const PageSwicher: React.FC = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={TRANSITION_DURATION}>
        {status => (
          <Switch>
            {pages.map(page => (
              <Route exact={true} path={`/${page.url}`} key={page.url}>
                <page.component
                  transitionStatus={status}
                  duration={TRANSITION_DURATION}
                />
              </Route>
            ))}
            <Route path={"*"}>
              <NotFound />
            </Route>
          </Switch>
        )}
      </CSSTransition>
    </TransitionGroup>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header>
        <Logo to="/">
          <img
            src={`${process.env.PUBLIC_URL}/img/watarium_logo.gif`}
            alt="ロゴ"
          />
        </Logo>
        <Menu />
        <CurrentName />
      </Header>
      <MainContent>
        <PageSwicher />
      </MainContent>
    </Router>
  );
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP&display=swap');
  ${reset}
  h1, h2, h3, p, a, address, button, li, span, label, dd, dl, dt, time {
    font-family: 'Noto Sans JP', 'YuGo-Medium', sans-serif;
    font-size: 18px;
  }
  a {
    text-decoration: none;
    color: #707070;
    transition: color .2s ease;
    &:hover {
      color: #202020;
    }
  }
  img {
    width: 100%;
  }
`;

const Header = styled.header`
  position: fixed;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  top: 0;
  left: 61px;
  z-index: 1000;
  height: 100vh;
`;

const Logo = styled(Link)`
  position: fixed;
  top: 52px;
  left: 61px;
  z-index: 1000;
  height: 55px;
`;

const MainContent = styled.main`
  margin-left: 240px;
  width: calc(100% - 240px);
`;

export default App;
