import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";

function ProfileSidebar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: "8px" }} />
    </Box>
  );
}

export default function Home() {
  const githubUser = "madruga665";
  const pessoasFavoritas = [
    "juunegreiros",
    "omariosouto",
    "peas",
    "rafaballerini",
    "marcobrunodev",
    "felipefialho",
  ];

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className='welcomeArea' style={{ gridArea: "welcomeArea" }}>
          <h1 className='title'>
            <Box>Bem Vindo(a)</Box>
            <OrkutNostalgicIconSet />
          </h1>
        </div>
        <div className='profileRelationsArea' style={{ gridArea: "profileRelationsArea" }}>
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>Pessoas da Comunidade ({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>Comunidades</Box>
        </div>
      </MainGrid>
    </>
  );
}
