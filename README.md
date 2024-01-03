### 구조

1. JS - 프론트엔드
2. Go - 백엔드
3. Solidity - 컨트랙트
4. AWS RDS PostgreSQL - 데이터베이스
5. AWS EC2 - 서버 배포
6. Firebase - 프론트 배포


### NFT 담보 대출 흐름

1. **Borrower**가 자기 지갑 속 어떤 NFT를 담보로 돈을 빌릴 건지 결정한다.
2. 어떤 NFT를 담보로 돈을 빌릴 건지 선택했다면, 지갑을 연결하여 다음의 옵션들을 설정한 뒤 NFT를 플랫폼에 리스팅한다.
    - 빌리고 싶은 액수
    - 빌리고 싶은 기간(7days/30days/90days)
    - 희망 이자율
3. 이제 **Lender**는 자신이 돈을 빌려주고 싶은 **Borrower**의 **NFT**(담보물)을 찾으면 된다.
    - loan to earn : 돈을 빌려주고 높은 APR(이자율)을 실현하는 행위
    - loan to own : **Borrower**가 대출금 상환 만기일을 지키지 못할 시 빌려준 대출금은 못 받게 되지만, 낮은 LTV(대출 금액 대비 담보물 가치) 기반으로 대출이 이루어졌다면 아주 싼 값으로 NFT를 가져올 수 있게 된다.

### 특징

1. 누구나 암호화폐 지갑과 NFT만 있다면, 대출 서비스 사용가능
2. 중개자가 없기때문에 수수료 절감 가능
3. 프로젝트가 발행한 NFT 소유시, 프로젝트 수익 공유

### 프로젝트 자체 발행 NFT

1. ERC-1155 기반
2. 스테이킹 기간에 따른, NFT 업그레이드
3. NFT는 초기 기여자들을 상대로 0.01 ETH 가격에 주조 기회 제공
4. NFT 보유시 거버넌스 투표 참여 가능


