import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/AddPerson")
public class AddPerson extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	request.setCharacterEncoding("UTF-8");
    	String personName = request.getParameter("personName");
       
        // 체크리스트를 검색하거나 생성
        HashMap<String, ArrayList<String>> checklists = (HashMap<String, ArrayList<String>>) request
                .getSession().getAttribute("checklists");
        if (checklists == null) {
            checklists = new HashMap<>();
            request.getSession().setAttribute("checklists", checklists);
        }

        // 사용자가 이미 존재하는지 확인
        if (!checklists.containsKey(personName)) {
            // 사용자를 위한 새로운 체크리스트를 생성
            ArrayList<String> checklist = new ArrayList<>();

            // 사용자와 그들의 체크리스트를 맵에 추가
            checklists.put(personName, checklist);

            // 업데이트된 체크리스트를 속성으로 설정.
            request.getSession().setAttribute("checklists", checklists);
        }

        // 업데이트된 사용자 목록을 속성으로 설정
        ArrayList<String> personList = new ArrayList<>(checklists.keySet());
        request.getSession().setAttribute("personList", personList);

        // 업데이트된 목록을 표시하기 위해 index.jsp로 포워딩
        request.getRequestDispatcher("index.jsp").forward(request, response);
    }
}
