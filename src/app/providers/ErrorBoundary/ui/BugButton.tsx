import { FC, useEffect, useState } from 'react';
import { Button } from 'shared/ui';

const BugButton: FC = () => {
  const [error, setError] = useState(false);

  const onThrow = () => setError(true);

  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);

  return (
    <Button
      onClick={onThrow}
    >
      throw error
    </Button>
  );
};

export default BugButton;
