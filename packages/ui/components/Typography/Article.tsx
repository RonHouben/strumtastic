import { classNames } from '../../utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Article = ({ children, className }: Props) => (
  <article className={classNames('prose', className || '')}>{children}</article>
);
