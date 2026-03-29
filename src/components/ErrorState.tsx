export function ErrorState({ message }: { message: string }) {
  return <div className="error-box">{message}</div>;
}
