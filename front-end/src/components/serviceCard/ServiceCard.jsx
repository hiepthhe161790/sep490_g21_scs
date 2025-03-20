import { Card, CardContent, Typography } from '@mui/material';

function ServiceCard({ icon, title, description }) {
  return (
    <Card sx={{ textAlign: 'center', height: '100%' }}>
      <CardContent>
        <div style={{ fontSize: '40px' }}>{icon}</div>
        <Typography variant="h6" sx={{ marginTop: 1 }}>{title}</Typography>
        <Typography variant="body2" sx={{ marginTop: 1 }}>{description}</Typography>
      </CardContent>
    </Card>
  );
}

export default ServiceCard;
