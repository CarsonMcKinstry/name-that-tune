import { getAuthPropsFromContext } from "@packages/spotify/auth/getAuthProps";
import { AuthProps, AuthProvider } from "@packages/spotify";
import { GetServerSideProps, NextPage } from "next";

type GameHomeProps = AuthProps & {

}

const GameHome: NextPage<GameHomeProps> = ({ accessToken }) => {
    return (
        <AuthProvider accessToken={accessToken}>
            <div>
                <pre>
                    {accessToken}
                </pre>
                <a href="/api/logout">
                    Logout
                </a>
            </div>
        </AuthProvider>
    )
}

export const getServerSideProps: GetServerSideProps<GameHomeProps> = async (context) => {
    const authProps = await getAuthPropsFromContext(context);

    if (!authProps.accessToken) {
        return {
            redirect: {
                destination: '/api/refresh?redirect=game',
                permanent: false
            }
        }
    }

    return {
        props: {
            ...authProps,
        }
    }
}

export default GameHome;