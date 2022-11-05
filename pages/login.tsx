import { GetServerSideProps } from "next";
import { getProviders, ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";
import logo from "../assets/Spotify_Icon.png";
interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>;
}
const login = ({ providers }: Props) => {
  const { name: providerName, id: providerId } =
    providers?.spotify as ClientSafeProvider;
  return (
    <div className="flex flex-col justify-center items-center bg-black h-screen">
      <div className="mb-6">
        <Image src={logo} alt="logo" height="200px" width="200px" />
      </div>
      <button
        className="bg-spotifycolor text-while p-5 rounded-full"
        onClick={() => signIn(providerId, { callbackUrl: "/" })}
      >
        Login with {providerName}
      </button>
    </div>
  );
};

export default login;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
