import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

export default function Error({message}) {
  return (
<Alert severity="error">
  <AlertTitle>Error</AlertTitle>
  This is an error alert — <strong>check it out!</strong>
</Alert>
  )
}
