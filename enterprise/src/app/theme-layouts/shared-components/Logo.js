import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className="flex items-center">
      <p className='text-20 text-white font-bold'>UZBEKBAZAR</p>

      <div
        className="badge flex items-center py-4 px-8 mx-8 rounded"
        style={{ backgroundColor: '#121212', color: '#61DAFB' }}
      >
      </div>
    </Root>
  );
}

export default Logo;
