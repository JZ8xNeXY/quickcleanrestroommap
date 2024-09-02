export const modalStyle = {
  position: 'absolute' as const,
  top: '48.5%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '90%',
    sm: '65%',
    md: '46%',
    lg: '38%',
    xl: '28%',
  },
  height: '80%',
  bgcolor: '#F9F9F9',
  boxShadow: 24,
  p: 3,
  overflow: 'auto',
  borderRadius: '10px',
}

export const closeButtonStyle = {
  color: '#000000',
}

{
  /* レスポンシブ対応 */
}
export const imageBoxStyle = {
  width: '100%',
  height: 'auto',
  '& img': {
    width: '100%',
    height: 'auto',
  },
}

export const facilityNameStyle = {
  display: 'flex',
  bgcolor: '#F0F0F0',
  alignItems: 'center',
  borderRadius: '5px',
  p: 1,
  mt: 2,
}

export const modalContentTitle = { fontWeight: 'bold', mt: 1 }
