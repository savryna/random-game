export function openDialog(dialog) {
  setTimeout(() => dialog.show(), 300);
  dialog.classList.add('open');
}

export function closeDialog(dialog) {
  setTimeout(() => dialog.close(), 300);
  dialog.classList.remove('open');
}
