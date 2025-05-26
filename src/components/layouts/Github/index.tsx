import GithubIcon from "@/assets/icons/github.svg";
import TipButton from "@/components/ui/TipButton";

const Github = () => {
  return (
    <TipButton content="我的github" text="github" icon={<GithubIcon />} />
  );
}

export default Github;