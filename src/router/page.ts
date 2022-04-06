export default [
  {
    title: '中国国旗',
    path: 'FlagChina',
    name: 'vFlagChina',
    component: () => import('@/views/page/FlagChina.vue'),
  },
  {
    title: '中国象棋棋盘',
    path: 'ChineseChessBoard',
    name: 'vChineseChessBoard',
    component: () => import('@/views/page/ChineseChessBoard.vue'),
  },
];
