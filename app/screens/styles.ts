import { colors } from 'app/theme';
import styled from 'styled-components/native';

export const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: baseline;
  padding-bottom: 10px;
  align-sef: flex-start;
  width: 100%;
`;

export const HeaderText = styled.Text<{ $bold?: boolean }>`
  color: ${colors.tint};
  font-weight: ${(props) => (props.$bold ? 'bold' : 'normal')};
  font-size: 18px;
  line-height: 28px;
`;
