import styled from "styled-components";
export const ModalStreamWrapper = styled.div`
  position: relative;

  .comment__list {
    max-height: 300px;
    overflow-y: auto;
  }

  .comment__item {
    display: flex;
    margin-bottom: 10px;
    .comment__item__avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .comment__item__content {
      width: calc(100% - 50px);
      .comment__item__content__name {
        font-weight: bold;
        margin-bottom: 5px;
      }
      .comment__item__content__text {
        font-size: 14px;
      }
    }
  }
`;
