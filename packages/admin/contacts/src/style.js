// @flow

import { css } from 'linaria';

export default {
  card: css`
    ${'' /* max-width: 500px;
    min-width: 300px; */}
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
  `,
  media: css`
    flex: 1;
    min-height: 150px;
    overflow: auto;
  `,
};
