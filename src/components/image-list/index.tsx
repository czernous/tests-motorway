import React, { useContext } from 'react';
import { AppContext } from '../../app-state/app-state.base';
import { ImageList as MUIIMageList, ImageListItem, Box, Typography, Skeleton, Stack } from '@mui/material';
import { Search } from '@mui/icons-material';

// Please refer to task 2. Realtime search results of readme.md
const ImageList: React.FC = () => {
  const ctx = useContext(AppContext);

  return ctx.isFetchingCars || ctx.cars?.length ? (
    <Box>
      <Typography variant="h1" fontSize={48} fontWeight={600} sx={{ textTransform: 'capitalize' }} mb={4}>
        {ctx.isFetchingCars ? <Skeleton sx={{ maxWidth: 300, bgcolor: 'grey.700' }} /> : ctx?.selectedTag}
      </Typography>
      <MUIIMageList cols={3} gap={8} rowHeight={410}>
        {ctx.isFetchingCars
          ? new Array(9).fill(1).map((_, i) => (
              <ImageListItem key={i}>
                <Skeleton sx={{ height: '100%', transform: 'none', bgcolor: 'grey.700' }} />
              </ImageListItem>
            ))
          : ctx.cars?.map((car) => (
              <ImageListItem key={car.url}>
                <img
                  src={`https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} // TODO: Replace with car.url when access issues are rectified
                  alt={car.alt_description}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
      </MUIIMageList>
    </Box>
  ) : (
    <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Stack maxWidth={393} textAlign={'center'} display={'flex'} alignItems={'center'}>
        <Search sx={{ fontSize: 40 }} />
        <Typography variant="h1" fontSize={48} fontWeight={600}>
          Use the search to find vehicles
        </Typography>
      </Stack>
    </Box>
  );
};

export default ImageList;
