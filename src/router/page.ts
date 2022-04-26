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
];
