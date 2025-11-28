namespace Api.BusinessLogic.Services.Abstraction;

public interface ICrudService<TCreateDto, TReadDto, TId>
    where TCreateDto : Dto.Dto
    where TReadDto : Dto.Dto
{
    Task<IEnumerable<TReadDto>> GetAllAsync();
    Task<TReadDto> GetByIdAsync(TId id);
    Task<TId> CreateAsync(TCreateDto dto);
    Task<TId> UpdateAsync(TId id, TCreateDto dto);
    Task DeleteAsync(TId id);
}