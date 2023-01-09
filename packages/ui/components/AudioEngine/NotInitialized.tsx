import { ButtonLink } from '../ButtonLink';
import { Article } from '../Typography';

export const AudioEngineNotInitialized = () => {
  return (
    <Article className="flex flex-col">
      <span>Unplugged guitar!</span>
      <ButtonLink
        size="md"
        variant="filled"
        color="secondary"
        href="/connect-guitar"
      >
        Plugin!
      </ButtonLink>
    </Article>
  );
};
