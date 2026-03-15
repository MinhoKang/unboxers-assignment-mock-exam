import { useEffect, useEffectEvent, useRef } from "react";
import toast from "react-hot-toast";

import { useExamForm } from "./useExamForm";
import { useExamSession } from "./useExamSession";

const TOAST_IDS = {
  waiting: "exam-waiting",
  finished: "exam-finished",
  submitted: "exam-submitted",
} as const;

/**
 * 시험 화면의 세션 상태, 입력 가능 여부, 토스트, 자동 제출 흐름을 조합합니다.
 * @description `ExamPage`는 이 훅이 내려주는 props를 렌더링에만 사용하고, 비즈니스 로직은 여기서 처리합니다.
 * @returns OMR 카드, 숫자 키패드, 컨트롤 바에 바로 전달할 props 묶음
 */
export const useExamPageController = () => {
  const examSession = useExamSession();
  const previousStatusRef = useRef(examSession.status);
  const examForm = useExamForm();

  const {
    isStudentIdentityComplete,
    hasSubmittedSuccessfully,
    clearSubjectiveFocus,
    submitExam,
    handleGradeChange,
    handleNumberChange,
    handleSelectObjective,
    handleSubjectiveChange,
    handleSubjectiveFieldFocus,
    handleKeypadInput,
    handleComplete,
  } = examForm;

  /**
   * @description 학년/번호는 대기 시간에는 막고, 제출 완료 후에도 다시 수정하지 못하게 합니다.
   */
  const canEditIdentity = !hasSubmittedSuccessfully && examSession.status !== "waiting";
  /**
   * @description 답안은 시험 진행 중에만 수정 가능하며, 종료 또는 제출 완료 후에는 잠급니다.
   */
  const canEditAnswers = !hasSubmittedSuccessfully && examSession.status === "examining";

  /**
   * @description 이미 제출된 상태에서 추가 조작이 들어오면 중복 제출 방지 토스트를 노출합니다.
   */
  const showSubmittedToast = () => {
    toast.error("이미 답안을 제출했습니다.", { id: TOAST_IDS.submitted });
  };

  /**
   * @description Identity 관련 작업이 막힐 때의 토스트를 보여줍니다.
   */
  const showIdentityLockToast = () => {
    if (hasSubmittedSuccessfully) {
      showSubmittedToast();
    } else {
      toast.error("시험이 아직 시작되지 않았습니다.", { id: TOAST_IDS.waiting });
    }
  };

  /**
   * @description 현재 시험 단계에 맞는 공통 잠금 토스트를 노출합니다.
   * @returns void
   */
  const showAnswerLockToast = () => {
    if (hasSubmittedSuccessfully) {
      showSubmittedToast();
      return;
    }

    if (examSession.status === "waiting") {
      toast.error("시험이 아직 시작되지 않았습니다.", { id: TOAST_IDS.waiting });
      return;
    }

    if (examSession.status === "finished") {
      toast.error(
        isStudentIdentityComplete
          ? "시험이 종료되어 답안을 더 수정할 수 없습니다."
          : "시험이 종료되었습니다. 학년과 번호를 입력한 뒤 제출해주세요.",
        { id: TOAST_IDS.finished },
      );
    }
  };

  /**
   * @description Identity 수정 권한이 있는지 확인하고 없으면 토스트를 보여주는 고차 함수입니다.
   */
  const withIdentityPermissionCheck = <T extends unknown[]>(handler: (...args: T) => void) => {
    return (...args: T) => {
      if (!canEditIdentity) {
        showIdentityLockToast();
        return;
      }
      handler(...args);
    };
  };

  /**
   * @description Answer 수정 권한이 있는지 확인하고 없으면 토스트를 보여주는 고차 함수입니다.
   */
  const withAnswerPermissionCheck = <T extends unknown[]>(
    handler: (...args: T) => void,
    additionalAction?: () => void,
  ) => {
    return (...args: T) => {
      if (!canEditAnswers) {
        showAnswerLockToast();
        additionalAction?.();
        return;
      }
      handler(...args);
    };
  };

  /**
   * @description 시험 종료로 상태가 처음 전환되는 순간에만 자동 제출을 시도합니다.
   * 학년/번호가 비어 있으면 종료 후 수동 제출 경로를 유지합니다.
   * @returns Promise<void>
   */
  const handleFinishedTransition = useEffectEvent(async () => {
    if (!isStudentIdentityComplete || hasSubmittedSuccessfully) {
      return;
    }

    await submitExam();
  });

  /**
   * @description 답안 수정이 막히는 시점에는 주관식 포커스를 즉시 해제해 키패드 입력이 이어지지 않도록 합니다.
   */
  useEffect(() => {
    if (!canEditAnswers) {
      clearSubjectiveFocus();
    }
  }, [canEditAnswers, clearSubjectiveFocus]);

  /**
   * @description 종료 상태로 처음 진입했을 때만 자동 제출 effect를 실행합니다.
   */
  useEffect(() => {
    if (previousStatusRef.current !== "finished" && examSession.status === "finished") {
      void handleFinishedTransition();
    }

    previousStatusRef.current = examSession.status;
  }, [examSession.status]);

  // Identity 관련 핸들러들 - 고차 함수로 간소화
  const handleGradeSelection = withIdentityPermissionCheck(handleGradeChange);
  const handleStudentNumberChange = withIdentityPermissionCheck(handleNumberChange);

  // Answer 관련 핸들러들 - 고차 함수로 간소화
  const handleObjectiveSelection = withAnswerPermissionCheck(handleSelectObjective);
  const handleSubjectiveAnswerChange = withAnswerPermissionCheck(handleSubjectiveChange);
  const handleSubjectiveFocus = withAnswerPermissionCheck(
    handleSubjectiveFieldFocus,
    clearSubjectiveFocus, // 추가 액션: 포커스 해제
  );
  const handleKeypadInteraction = withAnswerPermissionCheck(handleKeypadInput);
  const handleKeypadComplete = withAnswerPermissionCheck(handleComplete);

  /**
   * @description 화면 컴포넌트가 직접 로직을 몰라도 되도록, 렌더링에 필요한 props만 섹션별로 반환합니다.
   */
  return {
    examCardProps: {
      examTitle: examForm.examTitle,
      subject: examForm.subject,
      studentName: examForm.studentName,
      schoolName: examForm.schoolName,
      seatNumber: examForm.seatNumber,
      supervisorName: examForm.supervisorName,
      grade: examForm.grade,
      studentNumber: examForm.studentNumber,
      isStudentNumberReadOnly: !canEditIdentity,
      onGradeChange: handleGradeSelection,
      onNumberChange: handleStudentNumberChange,
      objectiveQuestionCount: examForm.objectiveQuestionCount,
      subjectiveQuestionCount: examForm.subjectiveQuestionCount,
      objectiveAnswers: examForm.objectiveAnswers,
      isObjectiveReadOnly: !canEditAnswers,
      onObjectiveBlockedInteraction: showAnswerLockToast,
      onObjectiveSelect: handleObjectiveSelection,
      subjectiveAnswers: examForm.subjectiveAnswers,
      isSubjectiveReadOnly: !canEditAnswers,
      onSubjectiveBlockedInteraction: showAnswerLockToast,
      focusedField: examForm.focusedField,
      fieldRefs: examForm.fieldRefs,
      onSubjectiveChange: handleSubjectiveAnswerChange,
      onSubjectiveFieldFocus: handleSubjectiveFocus,
    },
    keypadProps: {
      onInput: handleKeypadInteraction,
      onComplete: handleKeypadComplete,
      focusedField: examForm.focusedField,
      currentValue: examForm.currentSubjectiveValue,
      isReadOnly: !canEditAnswers,
      onBlockedInteraction: showAnswerLockToast,
    },
    controlBarProps: {
      status: examSession.status,
      remainingTime: examSession.remainingTime,
      totalTime: examSession.totalTime,
      onSubmit: submitExam,
      isSubmitting: examForm.isSubmitting,
      isSubmitDisabled: hasSubmittedSuccessfully,
      submitLabel: hasSubmittedSuccessfully ? "제출 완료" : undefined,
    },
  };
};
