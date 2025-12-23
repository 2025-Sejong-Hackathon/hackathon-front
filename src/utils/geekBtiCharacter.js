/**
 * GeekBTI와 캐릭터 이미지를 매칭하는 유틸 함수
 * 
 * GeekBTI는 4자리 문자열로 구성:
 * - 1번째: M(아침형) 또는 N(저녁형)
 * - 2번째: C(청결형) 또는 D(방치형)
 * - 3번째: S(예민형) 또는 T(둔감형)
 * - 4번째: E(외향형) 또는 I(내향형)
 * 
 * 총 16가지 조합이 가능합니다.
 */

// 캐릭터 이미지 import
import 펭귄 from '../assets/character/펭귄.png';
import 토깽이 from '../assets/character/토깽이.png';
import 키보드 from '../assets/character/키보드.png';
import 유니콘 from '../assets/character/유니콘.png';
import 여우 from '../assets/character/여우.png';
import 사자 from '../assets/character/사자.png';
import 부엉이 from '../assets/character/부엉이.png';
import 뱀 from '../assets/character/뱀.png';
import 문어 from '../assets/character/문어.png';
import 라쿤 from '../assets/character/라쿤.png';
import 돼지 from '../assets/character/돼지.png';
import 다람이 from '../assets/character/다람이.png';
import 꿀벌 from '../assets/character/꿀벌.png';
import 곰돌이 from '../assets/character/곰돌이.png';
import 고양이 from '../assets/character/고양이.png';
import 개 from '../assets/character/개.png';

/**
 * GeekBTI 조합과 캐릭터 매핑
 * 총 16가지 조합을 캐릭터와 1:1 매칭
 */
const GEEKBTI_CHARACTER_MAP = {
    // M(아침형) 조합
    MCSE: 펭귄,      // 아침형, 청결형, 예민형, 외향형
    MCSI: 토깽이,    // 아침형, 청결형, 예민형, 내향형
    MCTE: 키보드,    // 아침형, 청결형, 둔감형, 외향형
    MCTI: 유니콘,    // 아침형, 청결형, 둔감형, 내향형
    MDSE: 여우,      // 아침형, 방치형, 예민형, 외향형
    MDSI: 사자,      // 아침형, 방치형, 예민형, 내향형
    MDTE: 부엉이,    // 아침형, 방치형, 둔감형, 외향형
    MDTI: 뱀,        // 아침형, 방치형, 둔감형, 내향형

    // N(저녁형) 조합
    NCSE: 문어,      // 저녁형, 청결형, 예민형, 외향형
    NCSI: 라쿤,      // 저녁형, 청결형, 예민형, 내향형
    NCTE: 돼지,      // 저녁형, 청결형, 둔감형, 외향형
    NCTI: 다람이,    // 저녁형, 청결형, 둔감형, 내향형
    NDSE: 꿀벌,      // 저녁형, 방치형, 예민형, 외향형
    NDSI: 곰돌이,    // 저녁형, 방치형, 예민형, 내향형
    NDTE: 고양이,    // 저녁형, 방치형, 둔감형, 외향형
    NDTI: 개,        // 저녁형, 방치형, 둔감형, 내향형
};

/**
 * GeekBTI 문자열을 받아 해당하는 캐릭터 이미지를 반환하는 함수
 * 
 * @param {string} geekBti - GeekBTI 문자열 (예: 'MCSE', 'NDTI')
 * @returns {string|null} - 캐릭터 이미지 경로 또는 null (유효하지 않은 GeekBTI인 경우)
 * 
 * @example
 * getCharacterByGeekBti('MCSE') // 펭귄 이미지 반환
 * getCharacterByGeekBti('NDTI') // 개 이미지 반환
 * getCharacterByGeekBti('INVALID') // null 반환
 */
export const getCharacterByGeekBti = (geekBti) => {
    if (!geekBti || typeof geekBti !== 'string') {
        return null;
    }

    // 대문자로 변환하여 매칭 (소문자 입력도 허용)
    const normalizedGeekBti = geekBti.toUpperCase();

    // 매핑에서 찾기
    const character = GEEKBTI_CHARACTER_MAP[normalizedGeekBti];

    return character || null;
};

/**
 * 유효한 GeekBTI인지 확인하는 함수
 * 
 * @param {string} geekBti - GeekBTI 문자열
 * @returns {boolean} - 유효한 GeekBTI인지 여부
 * 
 * @example
 * isValidGeekBti('MCSE') // true
 * isValidGeekBti('ABCD') // false
 */
export const isValidGeekBti = (geekBti) => {
    if (!geekBti || typeof geekBti !== 'string') {
        return false;
    }

    const normalizedGeekBti = geekBti.toUpperCase();
    return normalizedGeekBti in GEEKBTI_CHARACTER_MAP;
};

/**
 * 모든 GeekBTI 조합 목록을 반환하는 함수
 * 
 * @returns {string[]} - 모든 GeekBTI 조합 배열
 */
export const getAllGeekBtiCombinations = () => {
    return Object.keys(GEEKBTI_CHARACTER_MAP);
};

/**
 * GeekBTI 조합의 설명을 반환하는 함수
 * 
 * @param {string} geekBti - GeekBTI 문자열
 * @returns {object|null} - GeekBTI 설명 객체 또는 null
 * 
 * @example
 * getGeekBtiDescription('MCSE')
 * // { 
 * //   morning: '아침형', 
 * //   cleanliness: '청결형', 
 * //   sensitivity: '예민형', 
 * //   extroversion: '외향형' 
 * // }
 */
export const getGeekBtiDescription = (geekBti) => {
    if (!isValidGeekBti(geekBti)) {
        return null;
    }

    const normalizedGeekBti = geekBti.toUpperCase();

    const descriptions = {
        M: '아침형',
        N: '저녁형',
        C: '청결형',
        D: '방치형',
        S: '예민형',
        T: '둔감형',
        E: '외향형',
        I: '내향형',
    };

    return {
        morning: descriptions[normalizedGeekBti[0]] || '',
        cleanliness: descriptions[normalizedGeekBti[1]] || '',
        sensitivity: descriptions[normalizedGeekBti[2]] || '',
        extroversion: descriptions[normalizedGeekBti[3]] || '',
    };
};

// 기본 export (주로 사용할 함수)
export default getCharacterByGeekBti;

