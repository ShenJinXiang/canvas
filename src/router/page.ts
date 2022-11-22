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
    path: 'RunnerBall',
    name: 'RunnerBall',
    component: () => import('@/views/page/RunnerBall.vue'),
  },
  {
    title: '彩色微粒',
    path: 'ColorParticle',
    name: 'ColorParticle',
    component: () => import('@/views/page/ColorParticle.vue'),
  },
  {
    title: '散漫的小球',
    path: 'DesultoryBall',
    name: 'DesultoryBall',
    component: () => import('@/views/page/DesultoryBall.vue'),
  },
  {
    title: '随机射线',
    path: 'RandomRadial',
    name: 'RandomRadial',
    component: () => import('@/views/page/RandomRadial.vue'),
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
  }
];
