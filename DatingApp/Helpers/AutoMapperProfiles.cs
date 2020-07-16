using AutoMapper;
using DatingApp.Dtos;
using DatingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(
                    destination => destination.PhotoUrl,
                    options => options.MapFrom(
                        src => src.Photos.FirstOrDefault(photo => photo.IsMain).Url
                    ))
                .ForMember(
                    destination => destination.Age,
                    options => options.MapFrom(
                            src => src.DateOfBirth.CalculateAge()
                        ));
            CreateMap<User, UserForDetailDto>()
                .ForMember(
                    destination => destination.PhotoUrl,
                    options => options.MapFrom(
                        src => src.Photos.FirstOrDefault(photo => photo.IsMain).Url
                    ))
                .ForMember(
                    destination => destination.Age,
                    options => options.MapFrom(
                            src => src.DateOfBirth.CalculateAge()
                        ));
            //first value - from, second - to (from UserForUpdateDto - to User) and when using _mapper.Map<User //destination//>(userForRegisterDto //from//)
            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>()
                .ForMember(m => m.SenderPhotoUrl, opt => opt
                    .MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl, opt => opt
                    .MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));
        }
    }
}
