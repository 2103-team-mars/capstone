import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedications } from '../store/medications';
import { Link } from 'react-router-dom';
import Medication from '../SVG/Medication';

import {
  Box,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  accordion: {
    backgroundColor: '#e5e5e5',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Medications = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const medications = useSelector((state) => state.medications);

  useEffect(() => {
    dispatch(fetchMedications(auth.metaId));
  }, []);

  return (
    <Grid container justify="center">
      <Grid item md={6}>
        <Box>
          {medications.map((medication) => {
            return (
              <Accordion key={medication.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className={classes.accordion}
                >
                  <Typography className={classes.heading}>
                    <strong>{medication.name}</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ display: 'block' }}>
                  <Typography>
                    <strong>Dosage:</strong> {medication.strength}
                  </Typography>
                  <Typography>
                    <strong>Company:</strong> {medication.company}
                  </Typography>
                  <Typography>
                    <strong>Instructions:</strong> {medication.instructions}
                  </Typography>
                  <Typography>
                    <strong>Reason:</strong> {medication.reason}
                  </Typography>
                  <Typography>
                    <strong>Prescribing Doctor:</strong>{' '}
                    <Link to={`/doctor/${medication.doctorId}`}>
                      {medication.doctor.user.firstName} {medication.doctor.user.lastName}
                    </Link>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box style={{ width: '50%', margin: '0 auto' }}>
          <Medication />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Medications;
