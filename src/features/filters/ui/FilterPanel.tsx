import { useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
  debounce,
  Selector,
  SelectorDot,
  type StatusesType,
  TextField,
} from '@/shared';

import type { IFiltersProps, IFiltersValue } from '../type';
export const FilterPanel = ({ filters, onChange }: IFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<IFiltersValue>(filters);
  const { t } = useTranslation();
  const debounceOnChange = useMemo(() => debounce(onChange, 500), [onChange]);

  useEffect(() => {
    if (
      localFilters.name !== filters.name ||
      localFilters.species !== filters.species ||
      localFilters.gender !== filters.gender ||
      localFilters.status !== filters.status
    ) {
      debounceOnChange(localFilters);
    }
  }, [localFilters, filters, debounceOnChange]);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const changeLocalFilters = (update: Partial<IFiltersValue>) => {
    setLocalFilters((prev) => ({ ...prev, ...update }));
  };

const statusOptions = [
  { value: 'alive', label: t('status.alive'), color: '#12B800' },
  { value: 'dead', label: t('status.dead'), color: '#DF0000' },
  { value: 'unknown', label: t('status.unknown'), color: '#FF9900' },
];


const speciesOptions = [
  { value: 'Human', label: t('species.human') },
  { value: 'Alien', label: t('species.alien') },
  { value: 'Humanoid', label: t('species.humanoid') },
  { value: 'Animal', label: t('species.animal') },
  { value: 'Robot', label: t('species.robot') },
  { value: 'Cronenberg', label: t('species.cronenberg') },
  { value: 'Mythology', label: t('species.mythology') },
  { value: 'Disease', label: t('species.disease') },
  { value: 'Unknown', label: t('status.unknown') },
];


 const genderOptions = [
  { value: 'female', label: t('gender.female') },
  { value: 'male', label: t('gender.male') },
  { value: 'genderless', label: t('gender.genderless') },
  { value: 'unknown', label: t('status.unknown') },
];


  return (
    <div className="filter-panel">
      <TextField
        value={localFilters.name}
        onChange={(value) => changeLocalFilters({ name: value })}
        placeholder={t('filters.name')}
        variant="default"
      />
      <Selector
        options={speciesOptions}
        value={localFilters.species}
        onChange={(value) => changeLocalFilters({ species: value })}
        placeholder={t("filters.species")}
        size="large"
      />
      <Selector
        options={genderOptions}
        value={localFilters.gender}
        onChange={(value) => changeLocalFilters({ gender: value })}
        placeholder={t("filters.gender")}
        size="large"
      />
      <Selector
        options={statusOptions}
        value={localFilters.status}
        onChange={(value) => changeLocalFilters({ status: value })}
        placeholder={t("filters.status")}
        size="large"
        OptionContentComponent={({ value }) => (
          <>
            {value}
            <SelectorDot status={value as StatusesType} />
          </>
        )}
      />
    </div>
  );
};
