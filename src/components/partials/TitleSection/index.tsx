import { Title } from "./styles";

type TitleSectionProps = {
    children: string;
};

export const TitleSection = ({ children }: TitleSectionProps) => {
    return <Title>{children}</Title>;
};
