import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AppFrame, { TABS } from './AppFrame';
import DirectorySearch from './DirectorySearch';
import RequirementRegister from './RequirementRegister';

const VIEWS = {
  directory: DirectorySearch,
  register: RequirementRegister,
};

// One framed LonRes app. Each subsection of "The model" can open it on its own tab;
// the store is shared, so changes in one view show up in the others.
export default function LonResPrototype({ initialTab = 'directory' }) {
  const [tab, setTab] = useState(initialTab);
  const View = VIEWS[tab];
  const title = TABS.find((t) => t.id === tab).label;

  return (
    <AppFrame tab={tab} onTab={setTab} available={Object.keys(VIEWS)} title={title}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          <View />
        </motion.div>
      </AnimatePresence>
    </AppFrame>
  );
}
