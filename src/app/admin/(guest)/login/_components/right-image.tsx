import Image from "next/image";

export const LoginImage = () => {
  return (
    <div className='hidden w-1/2 bg-blue-500 md:block'>
      <div className='relative flex h-full items-center justify-center overflow-hidden'>
        <div className='absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-xl' />
        <div className='absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-white/10 blur-xl' />
        <div className='relative z-10 p-8'>
          <Image
            src='/logo.svg'
            alt='Login illustration'
            width={600}
            height={600}
            className='drop-shadow-2xl'
            priority
          />
        </div>
      </div>
    </div>
  );
};
