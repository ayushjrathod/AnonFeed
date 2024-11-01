import Link from "next/link";

const page = () => {
  return (
    <div className="w-screen h-screen flex flex-col  gap-4 justify-center items-center">
      <h1 className="text-4xl">Feeder</h1>
      <p className="text-xl">An Anonymous feedback taking website</p>
      <div className="flex gap-4 w-fit">
        <Link
          href="/sign-in"
          className="bg-black border-2 hover:bg-white hover:border-black-2 hover:text-black text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="bg-black border-2 hover:bg-white hover:border-black-2 hover:text-black text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default page;
