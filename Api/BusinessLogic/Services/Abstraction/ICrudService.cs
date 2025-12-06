namespace Api.BusinessLogic.Services.Abstraction;

public interface ICrudService<in TCreateDto, TReadDto, TId>
    where TCreateDto : Dto.IDto
    where TReadDto : Dto.IDto
{
    Task<IEnumerable<TReadDto>> GetAllAsync();
    Task<TReadDto> GetByIdAsync(TId id);
    Task<TId> AdminCreateAsync(TCreateDto dto);
    Task<TId> UpdateAsync(TId id, TCreateDto dto);
    Task DeleteAsync(TId id);
}