function Message({ variant, children }) {
  return (
    <div id="message" className={variant}>
      {children}
    </div>
  );
}
export default Message;
