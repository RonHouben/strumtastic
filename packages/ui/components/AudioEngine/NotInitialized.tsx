import { ButtonLink } from "../ButtonLink";
import { Article } from "../Typography";

export const AudioEngineNotInitialized = () => {
  return (
    <Article className="flex flex-col">
      <span>Unplugged guitar!</span>
			<ButtonLink label="Plugin!" href="/connect-guitar" />
    </Article>
  );
};
