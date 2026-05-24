def get_grade_point(grade):
    grade = grade.upper()
    mapping = {
        'O': 10,
        'A+': 9,
        'A': 8,
        'B+': 7,
        'B': 6,
        'C': 5,
        'F': 0
    }
    return mapping.get(grade, 0)

def calculate_sgpa(subjects):
    """
    Calculates SGPA for a list of subjects.
    subjects is a list of dicts: [{'name': 'Math', 'credits': 4, 'grade': 'A+'}, ...]
    """
    total_credit_points = 0
    total_credits = 0

    for subject in subjects:
        credits = float(subject.get('credits', 0))
        grade = subject.get('grade', 'F')
        grade_point = get_grade_point(grade)

        total_credits += credits
        total_credit_points += credits * grade_point

    sgpa = (total_credit_points / total_credits) if total_credits > 0 else 0
    return sgpa, total_credits

def calculate_cgpa(semesters):
    """
    Calculates overall CGPA.
    semesters is a list of dicts: [{'sgpa': 8.5, 'credits': 20}, ...]
    """
    total_credit_points = 0
    total_credits = 0

    for sem in semesters:
        sgpa = float(sem.get('sgpa', 0))
        credits = float(sem.get('credits', 0))

        total_credits += credits
        total_credit_points += sgpa * credits

    cgpa = (total_credit_points / total_credits) if total_credits > 0 else 0
    return cgpa

def main():
    print("====================================")
    print("🎓 CGPA & SGPA Calculator CLI")
    print("====================================\n")
    
    num_semesters = int(input("How many semesters do you want to calculate for? "))
    
    semesters_data = []

    for i in range(num_semesters):
        print(f"\n--- Entering data for Semester {i+1} ---")
        num_subjects = int(input("How many subjects in this semester? "))
        
        subjects = []
        for j in range(num_subjects):
            print(f"\nSubject {j+1}:")
            name = input("  Name: ")
            credits = float(input("  Credits: "))
            grade = input("  Grade (O, A+, A, B+, B, C, F): ")
            subjects.append({
                'name': name,
                'credits': credits,
                'grade': grade
            })
            
        sgpa, sem_credits = calculate_sgpa(subjects)
        print(f"\n> Semester {i+1} SGPA: {sgpa:.2f} (Credits: {sem_credits:.1f})")
        
        semesters_data.append({
            'sgpa': sgpa,
            'credits': sem_credits
        })
        
    if len(semesters_data) > 0:
        cgpa = calculate_cgpa(semesters_data)
        total_credits = sum(s['credits'] for s in semesters_data)
        
        print("\n====================================")
        print(f"🌟 OVERALL CGPA: {cgpa:.2f}")
        print(f"Total Credits Earned: {total_credits:.1f}")
        print("====================================\n")

if __name__ == '__main__':
    main()
