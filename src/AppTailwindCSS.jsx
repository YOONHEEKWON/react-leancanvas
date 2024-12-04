import TailwindButton from './components/TailwindCSS/TailwindButton';

export default function AppTailwindCSS() {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-sky-300">
        Hello World!
      </h1>
      <TailwindButton>TailwindButton</TailwindButton>
    </>
  );
}
