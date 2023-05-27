import { ElMessage, ElMessageBox } from 'element-plus';
import { BuildPropType } from 'element-plus/lib/utils';

export const alert = (message: string, title: string = '提示', buttonText: string = '确定') =>
  new Promise((resolve) => {
    ElMessageBox.alert(message, title, {
      confirmButtonText: buttonText,
      callback: resolve
    });
  });

export const alertNoTitle = (message: string, buttonText: string = '确定') =>
  alert(message, '', buttonText);

export const msg = (message: string, type: BuildPropType<StringConstructor, "info" | "success" | "warning" | "error", unknown> = 'info') => ElMessage({ type, message });

export const successMsg = (message: string) => msg(message, 'success');
export const infoMsg = (message: string) => msg(message);
export const warningMsg = (message: string) => msg(message, 'warning');
export const errorMsg = (message: string) => msg(message, 'error');
interface IConfirmOp {
  title?: string;
  type?: '' | 'success' | 'warning' | 'info' | 'error';
  confirmButtonText?: string;
  cancelButtonText?: string;

}
export const confirm = (
  message: string,
  {
    title = '提示',
    type = '',
    confirmButtonText = '确定',
    cancelButtonText = '取消'
  }: IConfirmOp = {}
) =>
  new Promise((resolve, reject) => {
    ElMessageBox.confirm(message, title, {
      confirmButtonText,
      cancelButtonText,
      type
    })
      .then(resolve, reject)
      .catch(() => { });
  });

export const prompt = (
  message: string,
  { title = '提示', confirmButtonText = '确定', cancelButtonText = '取消' } = {}
) =>
  new Promise((resolve, reject) => {
    ElMessageBox.prompt(message, title, {
      confirmButtonText,
      cancelButtonText
    })
      .then(resolve, reject)
      .catch(() => { });
  });
