export default [
  {
    title: '中国国旗',
    path: 'FlagChina',
    name: 'FlagChina',
    component: () => import('@/views/page/FlagChina.vue'),
  },
  {
    title: '中国象棋棋盘',
    path: 'ChineseChessBoard',
    name: 'ChineseChessBoard',
    component: () => import('@/views/page/ChineseChessBoard.vue'),
  },
  {
    title: '硬笔练习纸',
    path: 'PenExercisePaper',
    name: 'PenExercisePaper',
    component: () => import('@/views/page/PenExercisePaper.vue'),
  },
  {
    title: '旋转八卦图',
    path: 'EightDiagrams',
    name: 'EightDiagrams',
    component: () => import('@/views/page/EightDiagrams.vue'),
  },
  {
    title: '围棋',
    path: 'ChineseGo',
    name: 'ChineseGo',
    component: () => import('@/views/page/ChineseGo.vue'),
  },
  {
    title: '乱撞的小球',
    path: 'background/RunnerBall',
    name: 'RunnerBall',
    component: () => import('@/views/page/background/RunnerBall.vue'),
  },
  {
    title: '彩色微粒',
    path: 'background/ColorParticle',
    name: 'ColorParticle',
    component: () => import('@/views/page/background/ColorParticle.vue'),
  },
  {
    title: '散漫的小球',
    path: 'background/DesultoryBall',
    name: 'DesultoryBall',
    component: () => import('@/views/page/background/DesultoryBall.vue'),
  },
  {
    title: '随机射线',
    path: 'background/RandomRadial',
    name: 'RandomRadial',
    component: () => import('@/views/page/background/RandomRadial.vue'),
  },
  {
    title: '字母变换',
    path: 'LetterTransform',
    name: 'LetterTransform',
    component: () => import('@/views/page/LetterTransform.vue'),
  },
  {
    title: '颜色转盘',
    path: 'ColorTurntable',
    name: 'ColorTurntable',
    component: () => import('@/views/page/animation/ColorTurntable.vue'),
  },
  {
    title: '象棋',
    path: 'ChineseChess',
    name: 'ChineseChess',
    component: () => import('@/views/page/game/ChineseChess.vue'),
  }
];
