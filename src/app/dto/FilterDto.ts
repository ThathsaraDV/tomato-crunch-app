export interface FilterDto {
    page: number;
    size: number;
    sortField: string | null;
    sortOrder: string | null;
}

export default FilterDto;