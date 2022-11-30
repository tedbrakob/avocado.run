type Props = {
  message: string,
}

export default function ErrorScreen(props: Props) {
  return (
    <div className="w-full my-2">
      <h2 className="max-w-fit mx-auto">{props.message}</h2>
    </div>
  );
}