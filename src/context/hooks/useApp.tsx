import React from 'react';

import { AppContext, AppContextValue } from 'AppContex/AppContext';

export const useApp = (): AppContextValue => {
  const context = React.useContext(AppContext);
  if (!context) {
    // eslint-disable-next-line i18next/no-literal-string
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
